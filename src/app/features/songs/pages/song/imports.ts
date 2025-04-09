// Import PrimeNG modules
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        ConfirmDialogModule,
        ConfirmPopupModule,
        MessageModule,
        MessagesModule,
    ],
      exports: [
        ConfirmDialogModule,
        ConfirmPopupModule,
        MessageModule,
        MessagesModule,
      ],
  providers: [  ]
})
export class ImportsModule {}
