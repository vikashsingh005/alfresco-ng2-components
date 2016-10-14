/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ElementRef } from '@angular/core';
import { DateWidget } from './date.widget';
import { FormFieldModel } from './../core/form-field.model';

describe('DateWidget', () => {

    let widget: DateWidget;
    let nativeElement: any;
    let elementRef: ElementRef;

    beforeEach(() => {
        nativeElement = {
            querySelector: function () {
                return null;
            }
        };
        elementRef = new ElementRef(nativeElement);
        widget = new DateWidget(elementRef);
    });

    it('should setup basic date picker settings on init ', () => {
        expect(widget.datePicker).toBeUndefined();
        widget.ngOnInit();
        expect(widget.datePicker).toBeDefined();
    });

    it('should setup min value for date picker', () => {
        let minValue = '13-03-1982';
        widget.field = new FormFieldModel(null, {
            minValue: minValue
        });
        widget.ngOnInit();

        let expected = moment(minValue, widget.DATE_FORMAT);
        expect(widget.datePicker._past.isSame(expected)).toBeTruthy();
    });

    it('should setup max value for date picker', () => {
        let maxValue = '31-03-1982';
        widget.field = new FormFieldModel(null, {
            maxValue: maxValue
        });
        widget.ngOnInit();

        let expected = moment(maxValue, widget.DATE_FORMAT);
        expect(widget.datePicker._future.isSame(expected)).toBeTruthy();
    });

    it('should setup default time value for date picker', () => {
        let dateValue = '13-03-1982';
        widget.field = new FormFieldModel(null, {
            type: 'date',
            value: '1982-03-13'
        });
        widget.ngOnInit();

        let expected = moment(dateValue, widget.DATE_FORMAT);
        expect(widget.datePicker.time.isSame(expected)).toBeTruthy();
    });

    it('should setup trigger element', () => {
        let el = {};
        spyOn(nativeElement, 'querySelector').and.returnValue(el);
        widget.ngOnInit();
        expect(widget.datePicker.trigger).toBe(el);
    });

    it('should not setup trigger element', () => {
        let w = new DateWidget(null);
        w.ngOnInit();
        expect(w.datePicker.trigger).toBeFalsy();
    });

    it('should eval visibility on date changed', () => {
        spyOn(widget, 'checkVisibility').and.callThrough();

        let field = new FormFieldModel(null);
        widget.field = field;

        widget.onDateChanged();
        expect(widget.checkVisibility).toHaveBeenCalledWith(field);
    });

    it('should update picker value on input date changed', () => {
        widget.field = new FormFieldModel(null, {
            type: 'date',
            value: '13-03-1982'
        });
        widget.ngOnInit();
        widget.field.value = '31-03-1982';
        widget.onDateChanged();

        let expected = moment('31-03-1982', widget.DATE_FORMAT);
        expect(widget.datePicker.time.isSame(expected)).toBeTruthy();
    });

    it('should update field value on date selected', () => {
        widget.field = new FormFieldModel(null, { type: 'date' });
        widget.ngOnInit();

        let date = '13-3-1982';
        widget.datePicker.time = moment(date, widget.DATE_FORMAT);
        widget.onDateSelected();
        expect(widget.field.value).toBe(date);
    });

    it('should update material textfield on date selected', () => {
        spyOn(widget, 'setupMaterialTextField').and.callThrough();

        widget.field = new FormFieldModel(null, { type: 'date' });
        widget.ngOnInit();

        widget.datePicker.time = moment();
        widget.onDateSelected();
        expect(widget.setupMaterialTextField).toHaveBeenCalled();
    });

    it('should not update material textfield on date selected', () => {
        let w = new DateWidget(null);
        spyOn(w, 'setupMaterialTextField').and.callThrough();

        w.field = new FormFieldModel(null, { type: 'date' });
        w.ngOnInit();

        w.datePicker.time = moment();
        w.onDateSelected();
        expect(w.setupMaterialTextField).not.toHaveBeenCalled();
    });
});