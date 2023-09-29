import { HttpErrorResponse } from "@angular/common/http";
import { Nullable } from "./types";
import { primitive } from "./primitive";

function parseHttpErrorResponse(resp: HttpErrorResponse) {
  if (resp) {
    switch (resp.status) {
      case 404:
        return `${resp.statusText} - Could not located one (or more) requested resources`;
      default:
        return resp.statusText;
    }
  }
  //else
  return 'Unknown http error!';
}

export const httpErrorParser = (error: any): Nullable<string> => {
  if (primitive.isNotNullish(error)) {
    console.warn("http error", error);
    if (error instanceof HttpErrorResponse) {
      return parseHttpErrorResponse(error);
    }
    //or
    return 'DEBUG: http Error';
  }
  //else 
  return null;
}