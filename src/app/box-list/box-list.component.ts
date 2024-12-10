import { Component, OnInit } from '@angular/core';
import { Box } from '../models/box.model';
import { Router } from '@angular/router';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-box-list',
  standalone: true,
  imports: [],
  templateUrl: './box-list.component.html',
  styleUrl: './box-list.component.css',
})
export class BoxListComponent implements OnInit {
  boxes: Box[] = [];
  private maxId!: number;

  constructor(private router: Router, private service: BoxService) {}

  ngOnInit(): void {
    this.service.getAllBoxData().subscribe((response) => {
      this.boxes = response;
    });
  }

  addBox(inputTitle: string): void {
    this.service.getMaxId().subscribe((response) => {
      this.maxId = ++response.maxId;
      const boxTitle = inputTitle ? inputTitle : `Title ${this.maxId}`;
      this.service.createNewBox({ id: this.maxId, title: boxTitle }).subscribe({
        next: (response) => {
          this.boxes = [...this.boxes, response.square];
        },
        error: (err) => console.error('Error adding box:', err),
      });
      window.location.reload();
    });
  }

  deleteBox(id: number): void {
    this.service.deleteExistingBox(id).subscribe({
      next: (response) => {
        this.boxes = this.boxes.filter((box) => box.id !== id);
      },
      error: (err) => console.error('Error deleting box:', err),
    });
    window.location.reload();
  }

  navigate(id: number): void {
    this.router.navigate(['/box', id]);
  }
}
