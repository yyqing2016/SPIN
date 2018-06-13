
import { Observable, throwError } from 'rxjs';
/**
 * Default error handler
 */

export class ErrorHandler {
  handleError(error): Observable<never> {
    return throwError(error.response.data.error || 'Server error');

  }
}

