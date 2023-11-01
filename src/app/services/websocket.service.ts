import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private _scaleConected: boolean = false;
  scaleConected$ = new Subject<boolean>();

  private _scaleWeight: number = 0;
  scaleWeight$ = new Subject<number>();



  constructor(
    private socket: Socket
  ) {
    console.log('Socket se ha conectado.');
  }



  public getScaleConected(): boolean {
    return this._scaleConected;
  }

  public setScaleConected(status: boolean): void {
    this._scaleConected = status;
    this.scaleConected$.next(this._scaleConected);
  }

  public getScaleWeight(): number {
    return this._scaleWeight;
  }

  public setScaleWeight(value: number): void {
    this._scaleWeight = value;
    this.scaleWeight$.next(this._scaleWeight);
  }






  public socketConnect() {
    this.socket.connect();
    this.socket.fromEvent('scaleStatus')
      .subscribe({
        next: (v) => {

          // console.log("scaleStatus", v);
          if (typeof v === 'boolean') {
            this.setScaleConected(v);

            console.log( "IsTrue:", (v ==true) );
            
            if(v == true) {
              this.joinRoomSocket();
            } else{
              this.leaveRoomSocket();
            }
            // console.log("this._scaleConnected", this._scaleConected);

          }

        },
        error: (err) => {
          console.log('FromEvent:', err);

        }
      });

  }

  public joinRoomSocket() {
    console.log('Joinroom');
    
    this.socket.emit('event_join', {room: 'scale_device'});
    this.socket.fromEvent('new_weight').subscribe({
      next: (v) =>{
        // console.log("Peso Balanza", v);
        if(typeof v === 'number') {
          this.setScaleWeight(v);
        }        
      },
      error: err => console.log(err)      
    });
  }

  public leaveRoomSocket() {
    this.socket.emit('event_leave',{room: 'scale_device'});
  }

  public exitSocketConn() {

    this.socket.disconnect();
  }
}
