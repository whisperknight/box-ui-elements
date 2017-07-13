/**
 * @flow
 * @file File picker header and list component
 * @author Box
 */

import React from 'react';
import ItemList from './ItemList';
import EmptyState from '../EmptyState';
import ProgressBar from '../ProgressBar';
import { VIEW_ERROR, VIEW_SELECTED } from '../../constants';
import type { View, Collection } from '../../flowTypes';
import './Content.scss';

type Props = {
    rootId: string,
    isSmall: boolean,
    rootElement: HTMLElement,
    focusedRow: number,
    selectableType: string,
    tableRef: Function,
    canSetShareAccess: boolean,
    onItemClick: Function,
    onItemSelect: Function,
    onShareAccessChange: Function,
    extensionsWhitelist: string[],
    hasHitSelectionLimit: boolean,
    getLocalizedMessage: Function,
    view: View,
    currentCollection: Collection
};

/**
 * Determines if we should show the empty state
 *
 * @param {string} view the current view
 * @param {Object} currentCollection the current collection
 * @return {boolean} empty or not
 */
function isEmpty(view: View, currentCollection: Collection): boolean {
    const { items = [] } = currentCollection;
    return view === VIEW_ERROR || items.length === 0;
}

const Content = ({
    view,
    rootId,
    isSmall,
    rootElement,
    focusedRow,
    hasHitSelectionLimit,
    selectableType,
    currentCollection,
    tableRef,
    canSetShareAccess,
    onItemClick,
    onItemSelect,
    onShareAccessChange,
    extensionsWhitelist,
    getLocalizedMessage
}: Props) =>
    <div className='bcp-content'>
        {view === VIEW_ERROR || view === VIEW_SELECTED
            ? null
            : <ProgressBar percent={currentCollection.percentLoaded} />}
        {isEmpty(view, currentCollection)
            ? <EmptyState
                view={view}
                getLocalizedMessage={getLocalizedMessage}
                isLoading={currentCollection.percentLoaded !== 100}
              />
            : <ItemList
                view={view}
                rootId={rootId}
                isSmall={isSmall}
                rootElement={rootElement}
                focusedRow={focusedRow}
                currentCollection={currentCollection}
                tableRef={tableRef}
                canSetShareAccess={canSetShareAccess}
                hasHitSelectionLimit={hasHitSelectionLimit}
                selectableType={selectableType}
                onItemSelect={onItemSelect}
                onItemClick={onItemClick}
                onShareAccessChange={onShareAccessChange}
                extensionsWhitelist={extensionsWhitelist}
                getLocalizedMessage={getLocalizedMessage}
              />}
    </div>;

export default Content;