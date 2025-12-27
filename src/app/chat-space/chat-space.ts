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
  chatRoomId = input<any>()
  chatId:string = ""
  username = input<string>()
  msgs = signal<ChatMsg[]>([])
  message = signal("")
  sender = signal("")
  constructor(private http:HttpClient, private cookie: CookieService, private ws: WebSocketService){}

  getMessages(){
    if(this.chatId === "" && this.chatRoomId()){ this.chatId = this.chatRoomId()}
    this.http.get(`http://localhost:8080/chat/getChat/${this.chatId}`)
    .subscribe({
      next: (res) => {
        this.msgs.set([])
        const data:any = res
        this.msgs.set(data)
        console.log(data);
      },
      error: (err) => { console.log("error: ", err) }
    })
    this.ws.connect()
    this.ws.subscribeToRoom(this.chatRoomId()!, (msg:any) => {
        console.log("New message received: ", msg)
      this.msgs.update(msgs => [...msgs, msg])
    })
  }

  ngOnInit(){
    this.sender.set(this.cookie.get('username'))
    this.getMessages()    
  }

  unSubscribe(){
    this.ws.unSubscribe(this.chatRoomId()!)
    this.getMessages()
  }

  setMesg(msg:string){
    this.message.set(msg.trim())
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
