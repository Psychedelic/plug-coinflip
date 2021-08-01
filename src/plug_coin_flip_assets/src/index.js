import { plug_coin_flip } from "../../declarations/plug_coin_flip";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with plug_coin_flip actor, calling the greet method
  const greeting = await plug_coin_flip.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
