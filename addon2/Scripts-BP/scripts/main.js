import {
  world,
  system,
  CustomCommandParamType,
  CommandPermissionLevel,
  CustomCommandStatus
} from "@minecraft/server";

// Colocar comandos dentro do minecraft
system.beforeEvents.startup.subscribe((init) => {
  const comando1 = {
    // Nome do comando
    name: "miguelsen:mensagem",
    // Descrição do comando no minecraft
    description: "Escreve seu nome para dar boas vindas",
    // Permissão para quem pode ativar
    permissionLevel: CommandPermissionLevel.Any,
    // Parametros obrigatórios
    mandatoryParameters: [{ type: CustomCommandParamType.String, name: "Nome" }]
  };

  const comando2 = {
    name: "miguelsen:alterar_piso",
    description: "Altera o bloco abaixo de todos os jogadores para meu tipo",
    permissionLevel: CommandPermissionLevel.Any,
    mandatoryParameters: [{type: CustomCommandParamType.BlockType, name: "Bloco"}]
  }

  init.customCommandRegistry.registerCommand(comando1, BoasVindas);
  init.customCommandRegistry.registerCommand(comando2, BlocoEmbaixo);
});

/*
    Criar funções usa function e os parametros só coloca o nome
    Nesse caso, os parametros vão ser os parametros do minecraft.
*/
function BoasVindas(origin, Nome) {

    // Função de flecha
    system.run(() => {
        world.sendMessage("Olá " + Nome + ", seja muito bem vindo!");
    });
    return {
        status: CustomCommandStatus.Success
    };
}

function BlocoEmbaixo(origin, Bloco) {
    system.run(() => {
        let players = world.getAllPlayers();

        for (let player of players) {
            let posicao = player.location;
            let dimensao = player.dimension;
            posicao.y -= 1;
            dimensao.setBlockType(posicao, Bloco);

        }
    });
    return {
        status: CustomCommandStatus.Success
    };
}
