import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {



  videos;
  selectedVideo: Video;

  constructor(private _videoSevice: VideoService) { }

  ngOnInit(): void {

    this._videoSevice.getVideos()
      .subscribe(resVideoData => {
        this.videos = resVideoData;
        console.log(resVideoData);   

      });

  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    console.log(this.selectedVideo);
  }

}
