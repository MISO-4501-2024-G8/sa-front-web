import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';

import { ThirdUserCatalog } from '../models/thirdu_catalog';

@Component({
  selector: 'app-third-detail',
  templateUrl: './third-detail.component.html',
  styleUrls: ['./third-detail.component.scss']
})
export class ThirdDetailComponent implements OnInit {

  id: string = '';
  thirdItem!: ThirdUserCatalog;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    const thirdId = this.sessionStorageService.getItem('thirdId') ?? '';
    if(thirdId === ''){
      this.router.navigate(['/third']);
    }
    this.id = thirdId;
    const thirdIt = this.sessionStorageService.getItem('thirdItem') ?? '';
    if(thirdIt === ''){
      this.router.navigate(['/third']);
    }
    this.thirdItem = JSON.parse(thirdIt);
    console.log("Third item: ", this.id, this.thirdItem)
  }

}
