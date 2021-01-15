import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    public cdEvent: any = {
        headerState: Function()
    };
    public _mainComm = new Subject<any>();
}