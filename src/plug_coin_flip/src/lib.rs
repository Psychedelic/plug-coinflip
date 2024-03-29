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

#[query(name = "getRank")]
fn get_rank() -> Option<usize> {
    let id = ic_cdk::caller();
    let profile_store = storage::get::<ProfileStore>();
    let profile = profile_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| Profile::default());

    let mut profiles_vec : Vec<Profile> = profile_store
        .values()
        .cloned()
        .collect();

    profiles_vec.sort_by(|a, b| {
        match b.score.cmp(&a.score) {
            Ordering::Equal => b.ratio.cmp(&a.ratio),
            other => other,
        }
    });

    return profiles_vec.iter().position(|s| s.principal == profile.principal);
}

#[query(name = "getSelf")]
fn get_self() -> Profile {
    let id = ic_cdk::caller();
    let profile_store = storage::get::<ProfileStore>();

    let profile = profile_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| Profile::default());

    return profile;
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

fn generate_random() -> bool {
    let nanos = ic_cdk::api::time() / 1000;

    if (nanos % 2) == 0 {
        return true
    } else {
        return false
    }
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

    let guess_result = generate_random() == guess;

    if guess_result {
        current_profile.score = current_profile.score + 1;
    }

    current_profile.ratio = current_profile.score * 100 / current_profile.attempts;

    id_store.insert(principal_id.to_string(), principal_id.clone()); 
    profile_store.insert(principal_id, current_profile);

    return guess_result;
}

#[query]
fn leaderboard() -> Vec<Profile> {
    let profile_store = storage::get::<ProfileStore>();

    let mut profiles_vec : Vec<Profile> = profile_store
        .values()
        .cloned()
        .collect();

    profiles_vec.sort_by(|a, b| {
        match b.score.cmp(&a.score) {
            Ordering::Equal => b.ratio.cmp(&a.ratio),
            other => other,
        }
    });

    profiles_vec.truncate(10);

    return profiles_vec;
}
