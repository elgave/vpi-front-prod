import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';


@Injectable({
  providedIn: 'root'
})
export class StompService {

  socket = new SockJS('https://vapai.herokuapp.com/vapai-websocket');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback:any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected){
      this.subscribeToTopic(topic,callback);
      return;
    }

    this.stompClient.connect({}, (): any =>{
      this.subscribeToTopic(topic,callback);
    });

  }

  private subscribeToTopic(topic: string, callback: any):void{
    this.stompClient.subscribe(topic, (): any =>{
      callback();
    })
  }
  
}
