import { Application, httpErrors, Router, Status } from "@oak/oak";

import { PlayerCreateService } from "../src/application/services/PlayerCreateService.ts";
import { PlayerRepository } from "../src/infrastructure/persistence/repositories/playerRepository/PlayerRepository.ts";
import { PlayerController } from "../src/presentation/controllers/PlayerController.ts";
import { PlayerFindService } from "../src/application/services/PlayerFindService.ts";
import { PlayerUpdateService } from "../src/application/services/PlayerUpdateService.ts";
import { PlayerDeleteService } from "../src/application/services/PlayerDeleteService.ts";

const app = new Application();
const router = new Router();

const playerCreateService = new PlayerCreateService(new PlayerRepository());
const playerFindService = new PlayerFindService(new PlayerRepository());
const playerUpdateService = new PlayerUpdateService(new PlayerRepository());
const playerDeleteService = new PlayerDeleteService(new PlayerRepository());
const playerController = new PlayerController(
  playerCreateService,
  playerFindService,
  playerUpdateService,
  playerDeleteService,
);

router
  .post("/players", playerController.postPlayer)
  .get("/players/:id", playerController.getPlayer)
  .put("/players/:id", playerController.putPlayer)
  .delete("/players/:id", playerController.deletePlayer);

app.use(async (context, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof httpErrors.NotFound) {
      context.response.status = Status.NotFound;
      context.response.body = { message: error.message };
      return;
    }
    if (error instanceof httpErrors.BadRequest) {
      context.response.status = Status.BadRequest;
      context.response.body = { message: error.message };
      return;
    }

    context.response.status = Status.InternalServerError;
    context.response.body = { message: "Internal server error" };
    console.error(error);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
