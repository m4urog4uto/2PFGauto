import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/core/models';

@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.css']
})
export class TableCourseComponent implements OnChanges {

  @Input()
  items: Course[] = [];

  @Output()
  editCourse = new EventEmitter<number>();

  @Output()
  removeCourse = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);

  displayedColumns: string[] = ['courseName', 'description', 'duration', 'actions'];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.items);
  }

  courseEdit(id: number): void {
    this.editCourse.emit(id);
  }
  
  courseRemove(id: number): void {
    this.removeCourse.emit(id);
  }
}