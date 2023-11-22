import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from "../../../services/video.service";
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  photos: any[] = [];

  constructor(private videoService: VideoService) {}
  ngOnInit() {
    this.videoService.getVideos('dogs').subscribe({
      next: (data) => {
        this.photos = data.photos;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
