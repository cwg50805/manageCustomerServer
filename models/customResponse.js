export class CustomResponse {  
    constructor(message, status, additionalInfo) {
      this.message = message;
      this.status = status;
      this.additionalInfo = additionalInfo
    }
  }