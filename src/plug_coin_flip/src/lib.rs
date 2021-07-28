use ic_cdk::export::{candid::{CandidType, Deserialize}, Principal};
use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::BTreeMap;
use std::cmp::Ordering;

type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, Profile>;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
struct Profile {
    pub principal: String,
    pub score: u32,
    pub attempts: u32,
    pub ratio: u32,
}

#[query(name = "getSelf")]
fn get_self() -> Profile {
    let id = ic_cdk::caller();
    let profile_store = storage::get::<ProfileStore>();

    profile_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| Profile::default())
}

#[query]
fn get(name: String) -> Profile {
    let id_store = storage::get::<IdStore>();
    let profile_store = storage::get::<ProfileStore>();

    id_store
        .get(&name)
        .and_then(|id| profile_store.get(id).cloned())
        .unwrap_or_else(|| Profile::default())
}

#[update(name = "coinFlip")]
fn coin_flip(guess: bool) -> bool {
    let id = ic_cdk::caller();
    let principal_id = ic_cdk::caller();
    let id_store = storage::get_mut::<IdStore>();
    let profile_store = storage::get_mut::<ProfileStore>();
    let mut current_profile = profile_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| Profile::default());

    current_profile.attempts = current_profile.attempts + 1;
    current_profile.principal = principal_id.to_string().clone();

    let guess_result = false == guess;

    if guess_result {
        current_profile.score = current_profile.score + 1;
    }

    current_profile.ratio = current_profile.score * 100 / current_profile.attempts;

    id_store.insert(principal_id.to_string(), principal_id.clone()); 
    profile_store.insert(principal_id, current_profile);

    return guess_result;
}

#[query]
fn leaderboard() -> std::vec::Vec<Profile> {
    let profile_store = storage::get::<ProfileStore>();

    let mut profiles_vec : Vec<Profile> = profile_store
        .values()
        .cloned()
        .collect();

    profiles_vec.sort_by(|a, b| {
        match b.ratio.cmp(&a.ratio) {
            Ordering::Equal => b.score.cmp(&a.score),
            other => other,
        }
    });
    return profiles_vec;
}
