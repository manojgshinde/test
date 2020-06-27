import { Injectable } from '@angular/core';
import 'rxjs/Rx';
// import 'rxjs/add/operator/map'
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class VideoService {

  private _getUrl = "/api/videos";

  constructor(private _http: HttpClient) { }

  getVideos() {
    return this._http.get(this._getUrl)
    }
}

