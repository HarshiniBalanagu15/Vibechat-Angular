import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  private client!: Client;

  private subscriptions = new Map<
    string,
    {
      destination: string;
      callback: (msg: any) => void;
      stompSub?: StompSubscription;
    }
  >();

  connect() {
    if (this.client?.active) return;

    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      debug: msg => console.log(msg)
    });

    this.client.onConnect = () => {
      console.log('WebSocket connected');
      this.subscriptions.forEach(sub => {
        sub.stompSub = this.client.subscribe(
          sub.destination,
          message => sub.callback(JSON.parse(message.body))
        );
      });
    };

    this.client.activate();
  }

  subscribeToRoom(roomId: string, callback: (msg: any) => void) {
    const destination = `/topic/chat/${roomId}`;

    if (this.subscriptions.has(roomId)) return;

    this.subscriptions.set(roomId, { destination, callback });

    if (this.client.connected) {
      const stompSub = this.client.subscribe(
        destination,
        message => callback(JSON.parse(message.body))
      );

      this.subscriptions.get(roomId)!.stompSub = stompSub;
    }
  }

  sendMessage(roomId: string, message: string, sender: string) {
    this.client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({
        message,
        belongToChatRoom: roomId,
        sender
      })
    });
  }

  disconnect() {
    this.subscriptions.clear();
    this.client.deactivate();
  }
}
