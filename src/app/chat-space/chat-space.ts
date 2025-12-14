import { HttpClient } from '@angular/common/http';
import { Component, input, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from '../websocket';

interface ChatMsg{
  message: string;
  belongToChatRoom: string;
  sender: string;
  time: string;
}

@Component({
  selector: 'app-chat-space',
  imports: [],
  templateUrl: './chat-space.html',
  styleUrl: './chat-space.css',
})

export class ChatSpace {
  chatRoomId = input<string>()
  username = input<string>()
  msgs = signal<ChatMsg[]>([])
  message = signal("")
  sender = signal("")
  constructor(private http:HttpClient, private cookie: CookieService, private ws: WebSocketService){}

  ngOnInit(){
    this.sender.set(this.cookie.get('username'))
    this.http.get(`http://localhost:8080/chat/getChat/${this.chatRoomId()}`)
    .subscribe({
      next: (res) => {
        const data:any = res
        this.msgs.set(data)
        console.log(data);
        console.log(this.username())
      },
      error: (err) => { console.log("error: ", err) }
    })
    this.ws.connect()
    this.ws.subscribeToRoom(this.chatRoomId()!, (msg:any) => {
        console.log("New message received: ", msg)
      this.msgs.update(msgs => [...msgs, msg])
    })
    
  }

  setMesg(msg:string){
    this.message.set(msg)
  }

  handleChatSend(e: Event){
    e.preventDefault();
    const msg = this.message().trim()
    if(msg.length === 0) return;
    this.ws.sendMessage(this.chatRoomId()!, msg, this.sender()!)
    this.message.set("")
  }

  ngOnDestroy(){
    this.ws.disconnect()
  }

}
