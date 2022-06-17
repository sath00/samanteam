import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/Feedback'
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment';
import { SuccessDialogComponent } from '../success/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private feedbacks: Feedback[] = [];
    private feedbacksUpdated = new Subject<Feedback[]>();

    constructor(private http: HttpClient, private dialog: MatDialog) { }

    // Feedback

    getFeedback() {
        this.http.get<Feedback[]>(environment.appURL + '/feedback/list').subscribe((feedbacksData) => {
            this.feedbacks = feedbacksData;

            if(this.feedbacks.length > 5) {
                this.feedbacks = this.feedbacks.splice(-5);
            }
            this.feedbacks = this.feedbacks.reverse();

            this.feedbacksUpdated.next(this.feedbacks);
        })
    }

    getFeedbackUpdatedListener() {
        return this.feedbacksUpdated.asObservable();
    }

    addFeedback(feedback: string) {
        const feed = {
            _id: "",
            feedback: feedback,
        }
        this.http.post<{ message: string }>(environment.appURL + '/feedback/add', feed)
            .subscribe((responseData) => {
                this.dialog.open(SuccessDialogComponent, {
                    width: '300px',
                    data: { message: responseData.message }
                });
            })
    }
}
