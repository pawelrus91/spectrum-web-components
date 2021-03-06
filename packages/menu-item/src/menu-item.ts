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

import { html, property, CSSResultArray, TemplateResult } from 'lit-element';

import '@spectrum-web-components/icon';
import '@spectrum-web-components/icons';
import { ActionButton } from '@spectrum-web-components/button';

import menuItemStyles from './menu-item.css.js';
import focusableStyles from '@spectrum-web-components/shared/lib/focusable.css.js';
import checkmarkMediumStyles from '@spectrum-web-components/icon/lib/spectrum-icon-checkmark-medium.css.js';

export interface MenuItemQueryRoleEventDetail {
    role: string;
}

/**
 * Spectrum Menu Item Component
 * @element sp-menu-item
 */
export class MenuItem extends ActionButton {
    public static get styles(): CSSResultArray {
        return [focusableStyles, menuItemStyles, checkmarkMediumStyles];
    }

    @property({ type: Number, reflect: true })
    public tabIndex = -1;

    private _value = '';

    @property({ type: String })
    public get value(): string {
        return this._value || this.itemText;
    }
    public set value(value) {
        if (value === this.value) {
            return;
        }
        this._value = value || '';
        if (this.value) {
            this.setAttribute('value', this.value);
        } else {
            this.removeAttribute('value');
        }
    }

    public get itemText(): string {
        return (this.textContent || /* istanbul ignore next */ '').trim();
    }

    protected get buttonContent(): TemplateResult[] {
        const content = super.buttonContent;
        if (this.selected) {
            content.push(html`
                <sp-icons-medium></sp-icons-medium>
                <sp-icon
                    id="selected"
                    name="ui:CheckmarkMedium"
                    size="s"
                    slot="icon"
                    class="checkmark-medium"
                ></sp-icon>
            `);
        }
        return content;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            const queryRoleEvent = new CustomEvent('sp-menu-item-query-role', {
                bubbles: true,
                composed: true,
                detail: {
                    role: '',
                },
            });
            this.dispatchEvent(queryRoleEvent);
            this.setAttribute('role', queryRoleEvent.detail.role || 'menuitem');
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-query-role': CustomEvent<MenuItemQueryRoleEventDetail>;
    }
}
