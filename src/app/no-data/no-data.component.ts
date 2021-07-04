import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.css'],
})
export class NoDataComponent implements OnInit {
  @Input('imageURL') imageURL: any;
  @Input('title') title: any;
  constructor() {}

  ngOnInit(): void {}
}
