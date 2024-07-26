import {
  Application,
  httpErrors,
  Router,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import { PlayerCreateService } from "../src/application/services/PlayerCreateService.ts";
import { PlayerRepository } from "../src/infrastructure/persistence/repositories/playerRepository/PlayerRepository.ts";
import { PlayerController } from "../src/presentation/controllers/PlayerController.ts";

const app = new Application();
const router = new Router();

const playerCreateService = new PlayerCreateService(new PlayerRepository());
const playerController = new PlayerController(playerCreateService);

router
  .post("/players", playerController.createPlayer);

app.use(async (context, next) => {
  try {
    await next();
  } catch (error) {
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
