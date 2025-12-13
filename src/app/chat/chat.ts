import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatSpace } from "../chat-space/chat-space";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  imports: [ChatSpace],
})
export class Chat implements OnInit{
  constructor(
    private http: HttpClient, 
    private cookie: CookieService, 
    private route:Router, 
    private zone: NgZone
  ){}
  username = ""
  chats = signal<any[]>([]);
  chatRoomId = signal("")
  reciever = signal("")
  showChatSpace = signal(false);

  toggleShowChatSpace(){
    this.showChatSpace.set(!this.showChatSpace())
  }

  ngOnInit(){
    this.username = this.cookie.get('username')
    if (!this.username || this.username === 'null' || this.username === 'undefined') {
      console.log("Redirecting to login because cookie is invalid");
      this.route.navigate(['/login']);
      return;   
    }
    this.getChats(this.username) 
  }

  getChats(username:any){
   this.http.get(`http://localhost:8080/chat/getChatsForUser/${username}`)
    .subscribe({
      next: (res) => {
        const data:any = res
        this.zone.run(() => {
          this.chats.set(data)
        })
      },
      error: (err) => (console.log("error", err))
    })
  }

  handleChatSpaceOpen(chatRoomId:string, reciever:string){
    console.log(chatRoomId)
    this.toggleShowChatSpace()
    this.chatRoomId.set(chatRoomId)
    this.reciever.set(reciever)
  }

}

