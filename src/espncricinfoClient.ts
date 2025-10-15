import { Match } from "./api/match";
import { Player } from "./api/player";
import { Series } from "./api/series";
import { Summary } from "./api/summary";
import { Client } from "./client";

export class EspnCricinfoClient extends Client {
    summary = new Summary(this)
    match = new Match(this)
    player = new Player(this)
    series = new Series(this)
}