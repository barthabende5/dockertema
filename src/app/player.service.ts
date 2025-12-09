import { Injectable } from '@angular/core';

export interface Player {
  name: string;
  position: string;
  age: number;
  team: string;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  async loadPlayers(): Promise<Player[]> {
    try {
      const res = await fetch('/players.csv');
      if (!res.ok) return [];
      const text = await res.text();
      return this.parseCSV(text);
    } catch (e) {
      console.error('Failed to load players.csv', e);
      return [];
    }
  }

  private parseCSV(text: string): Player[] {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length <= 1) return [];
    const players: Player[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      if (cols.length < 4) continue;
      players.push({
        name: cols[0],
        position: cols[1],
        age: Number(cols[2]) || 0,
        team: cols[3]
      });
    }
    return players;
  }
}
