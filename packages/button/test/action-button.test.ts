/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import '../';
import { ActionButton } from '../';
import { html } from 'lit-element';
import { fixture, elementUpdated, expect } from '@open-wc/testing';

describe('Button', () => {
    it('loads default', async () => {
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button>Button</sp-action-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('toggles', async () => {
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button toggles>Button</sp-action-button>
            `
        );

        await elementUpdated(el);
        const button = el.focusElement;

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.false;
        expect(button.getAttribute('aria-pressed')).to.equal('false');

        el.click();
        await elementUpdated(el);

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.true;
        expect(button.getAttribute('aria-pressed')).to.equal('true');
    });
});
