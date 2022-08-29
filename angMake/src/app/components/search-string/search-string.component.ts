import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { HandleKeywordService } from 'src/app/services/handle-keyword.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-string',
  templateUrl: './search-string.component.html',
  styleUrls: ['./search-string.component.scss']
})
export class SearchStringComponent implements OnInit {
  title = 'angMake';
  stringCheck: FormGroup;
  useString: string;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA] as const;
  Makekeywords: any
  keywordsLoading = false;
  keywordsNotFound: boolean;
  constructor(private handleKeyword: HandleKeywordService) {
  }

  ngOnInit(): void {
    this.stringCheck = new FormGroup({
      string: new FormControl('', { validators: [Validators.required] }),
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Makekeywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    console.log('added check', this.Makekeywords)
  }
  remove(keyword: any): void {
    const index = this.Makekeywords.indexOf(keyword);

    if (index >= 0) {
      this.Makekeywords.splice(index, 1);
    }
    console.log('remove check', this.Makekeywords)

  }
  onFindKeywords() {
    this.keywordsLoading = true

    if (this.stringCheck.invalid) {
      console.log('check form no push')
      return;
    }
    console.log('see string', this.stringCheck.value.string)
    this.handleKeyword.sendString(
      this.stringCheck.value.string
    ).subscribe(gotKeywords => {
      this.Makekeywords = gotKeywords.MAKEkeywords
      console.log('keywords :', this.Makekeywords)
      console.log('ln', this.Makekeywords.length)
      this.keywordsNotFound = false
      if (!this.Makekeywords.length) {
        this.keywordsNotFound = true
        console.log('Cant Find', this.Makekeywords.length)
      }
      this.keywordsLoading = false
    })
  }
}
