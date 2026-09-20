import {
    world,
    system
} from "@minecraft/server";

function Contar() {
    let tempo = system.currentTick;
    if (tempo % 100 === 0) {
        world.sendMessage("Olá, Jogador, já passaram: " + parseInt(tempo/20) + " segundos.");
    }

    system.run(Contar);
}

// Contar tempo
system.run(Contar);