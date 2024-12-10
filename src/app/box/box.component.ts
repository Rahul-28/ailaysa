import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from '../services/box.service';
import { Box } from '../models/box.model';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
})
export class BoxComponent implements OnInit {
  boxId!: number;
  retrievedBox!: Box;
  constructor(private route: ActivatedRoute, private service: BoxService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.boxId = +idParam;
      this.loadBox();
    }
  }

  async loadBox(): Promise<void> {
    await this.service.getBox(this.boxId).subscribe((response) => {
      this.retrievedBox = response;
    });
  }
}
