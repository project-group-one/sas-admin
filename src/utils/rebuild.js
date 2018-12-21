/*
 * @Author: yehq 
 * @Date: 2018-10-24 16:22:24 
 * @Last Modified by: yehq
 * @Last Modified time: 2018-12-20 17:20:51
 * @Description: 通过判断 props 中的某个值有没改变来确定子组件要不要重新构建
 */

import React, { PureComponent } from 'react';

const WILL_OPEN = 'WILL_OPEN';
const WILL_CLOSE = 'WILL_CLOSE';

const rebuild = ({
    propName = 'visible',
    afterClose,
    afterOpen,
    beforeOpen,
    beforeClose,
    isOpen = (targetProp) => targetProp === true,
}) => (Target) => {
    const RebuildWrapper = class RebuildWrapper extends PureComponent {
        state = {
            [propName]: null,
            keyNumber: 0,
            status: undefined,
        }

        static getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps[propName] !== prevState[propName]) {
                const newState = {
                    [propName]: nextProps[propName],
                }
                if (isOpen(nextProps[propName])) {
                    newState.keyNumber = prevState.keyNumber + 1;
                    newState.status = WILL_OPEN;
                } else {
                    newState.status = WILL_CLOSE;
                }
                return newState;
            }
            return null;
        }

        getSnapshotBeforeUpdate(prevProps) {
            if (this.props[propName] !== prevProps[propName]) {
                if (this.state.status === WILL_CLOSE) {
                    if (beforeClose) beforeClose(this.props);
                } else if (this.state.status === WILL_OPEN) {
                    if (beforeOpen) beforeOpen(this.props);
                }
                return this.state.status;
            }
            return false;
        }

        componentDidUpdate = (prevProps, prevState, status) => {
            if (status === WILL_CLOSE) {
                if (afterClose) afterClose(this.props);
            } else if (status === WILL_OPEN) {
                if (afterOpen) afterOpen(this.props);
            }
        }

        render() {
            const { keyNumber } = this.state;
            return (
                <Target key={keyNumber.toString()} {...this.props} />
            )
        }
    }
    return RebuildWrapper;
}

export default rebuild;

