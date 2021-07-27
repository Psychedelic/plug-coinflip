import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as plug_coin_flip_idl, canisterId as plug_coin_flip_id } from 'dfx-generated/plug_coin_flip';

const agent = new HttpAgent();
const plug_coin_flip = Actor.createActor(plug_coin_flip_idl, { agent, canisterId: plug_coin_flip_id });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  const greeting = await plug_coin_flip.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
