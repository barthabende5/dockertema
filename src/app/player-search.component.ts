import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService, Player } from './player.service';

@Component({
  selector: 'player-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent {
  players: Player[] = [];
  filtered: Player[] = [];
  search = '';
  loading = true;

  constructor(private svc: PlayerService) {}

  async ngOnInit() {
    this.players = await this.svc.loadPlayers();
    this.filtered = this.players;
    this.loading = false;
  }

  onSearch() {
    const term = this.search.trim().toLowerCase();
    this.filtered = term ? this.players.filter(p => p.name.toLowerCase().includes(term)) : this.players;
  }

  clear() {
    this.search = '';
    this.onSearch();
  }
}
