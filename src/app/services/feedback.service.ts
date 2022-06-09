import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/Feedback'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private feedbacks: Feedback[] = [];
    private feedbacksUpdated = new Subject<Feedback[]>();

    constructor(private http: HttpClient) { }

    // Feedback

    getFeedback() {
        this.http.get<Feedback[]>('http://localhost:3000/api/feedback/list').subscribe((feedbacksData) => {
            this.feedbacks = feedbacksData;
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
        this.http.post<{ message: string }>('http://localhost:3000/api/feedback/add', feed)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.getFeedback();
            })
    }
}
