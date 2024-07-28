import { Player } from "../../../../domain/entities/Player.ts";
import { AttackPoint } from "../../../../domain/value-objects/AttackPoint.ts";
import { DefensePoint } from "../../../../domain/value-objects/DefensePoint.ts";
import { HitPoint } from "../../../../domain/value-objects/HitPoint.ts";
import { UniqueIdentifier } from "../../../../domain/value-objects/UniqueIdentifier.ts";
import { supabase } from "../../supabase/supabaseClient.ts";
import { IPlayerRepository } from "./IPlayerRepository.ts";

export class PlayerRepository implements IPlayerRepository {
  public find = async (id: UniqueIdentifier): Promise<Player | null> => {
    const { data } = await supabase
      .from("players")
      .select("*")
      .eq("id", id.value)
      .single();

    if (!data) {
      return null;
    }

    return new Player(
      new UniqueIdentifier(data.id),
      new HitPoint(data.hit_point),
      new AttackPoint(data.attack_point),
      new DefensePoint(data.defense_point),
    );
  };

  public store = async (player: Player): Promise<void> => {
    const { error } = await supabase.from("players").upsert({
      id: player.id.value,
      hit_point: player.hitPoint.value,
      attack_point: player.attackPoint.value,
      defense_point: player.defensePoint.value,
    });

    if (error) {
      throw error;
    }
  };

  public delete = async (id: UniqueIdentifier): Promise<void> => {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id.value);

    if (error) {
      throw error;
    }
  };
}
