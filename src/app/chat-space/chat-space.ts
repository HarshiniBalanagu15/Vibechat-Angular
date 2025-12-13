import { HttpClient } from '@angular/common/http';
import { Component, input, Input, signal } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-space',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './chat-space.html',
  styleUrl: './chat-space.css',
})
export class ChatSpace {
  chatRoomId = input<string>()
  username = input<string>()
  msgs = signal<{message :string, belongToChatRoom: string, sender: string, time: string}[]>([])
  message = signal("")
  constructor(private http:HttpClient){}

  ngOnInit(){
    this.http.get(`http://localhost:8080/chat/getChat/${this.chatRoomId()}`)
    .subscribe({
      next: (res) => {
        const data:any = res
        this.msgs.set(data)
      },
      error: (err) => { console.log("error: ", err) }
    })
  }

  setMesg(msg:string){
    this.message.set(msg)
  }

  handleChatSend(e: Event){
    e.preventDefault();
    this.http.post(`http://localhost:8080/chat/updateChat`, {
      "belongToChatRoom": this.chatRoomId(),
      "message": this.message(),
      "sender": this.username(),
      "time": new Date()
    })
    .subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

}
