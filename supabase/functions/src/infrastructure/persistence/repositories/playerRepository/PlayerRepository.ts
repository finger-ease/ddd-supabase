import { Player } from "../../../../domain/entities/Player.ts";
import { supabase } from "../../supabase/supabaseClient.ts";
import { IPlayerRepository } from "./IPlayerRepository.ts";

export class PlayerRepository implements IPlayerRepository {
  public store = async (player: Player): Promise<void> => {
    try {
      const { error } = await supabase.from("players").upsert({
        id: player.id.value,
        hit_point: player.hitPoint.value,
        attack_point: player.attackPoint.value,
        defense_point: player.defensePoint.value,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
