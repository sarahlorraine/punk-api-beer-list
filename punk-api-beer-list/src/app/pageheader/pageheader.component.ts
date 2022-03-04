import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss'],
})
export class PageheaderComponent implements OnInit {
  @Input() title: string | null = '';
  constructor() {}

  ngOnInit(): void {}
}
