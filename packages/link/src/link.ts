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

import {
    html,
    property,
    CSSResultArray,
    TemplateResult,
    query,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';

import linkStyles from './link.css.js';

/**
 * Spectrum Link Component
 *
 * @attr quiet - uses quiet styles or not
 * @attr over-background - uses over background styles or not
 */
export class Link extends Focusable {
    public static get styles(): CSSResultArray {
        return [...super.styles, linkStyles];
    }

    @query('#anchor')
    anchorElement?: HTMLAnchorElement;

    public get focusElement(): HTMLElement {
        /* istanbul ignore if */
        if (!this.shadowRoot || !this.anchorElement) {
            return this;
        }
        return this.anchorElement;
    }

    @property({ reflect: true })
    public href: string | undefined = undefined;

    @property({ reflect: true })
    public download: string | undefined = undefined;

    @property({ reflect: true })
    public target?: '_blank' | '_parent' | '_self' | '_top';

    protected render(): TemplateResult {
        // prettier-ignore
        return html
            `<a
                id="anchor"
                href=${ifDefined(this.href)}
                download=${ifDefined(this.download)}
                target=${ifDefined(this.target)}
            ><slot></slot></a>`;
    }
}
