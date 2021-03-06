import React from 'react';
import renderer from 'react-test-renderer';
import Convert from '../src/Convert/BaseConvert';
import { mount } from 'enzyme';

/* eslint-disable */

test('create snapshot', () => {
    const component = renderer.create(<Convert />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn()
};

describe('Convert - Selects change value', () => {
    const wrapper = mount(<Convert {...props} />);

    it('changes appID value correctly', () => {
        const appID = wrapper.find('select').first();
        appID.simulate('change', { target: { value: 'ERE' } });
        expect(appID.node.value).toBe('ERE');

        appID.simulate('change', { target: { value: 'HIT' } });
        expect(appID.node.value).toBe('HIT');

        appID.simulate('change', { target: { value: 'H1T' } });
        expect(appID.node.value).toBe('H1T');

        appID.simulate('change', { target: { value: 'Other' } });
        expect(appID.node.value).toBe('Other');
    })

    it('changes convertTo value correctly', () => {
        const convertTo = wrapper.find('select').last();
        convertTo.simulate('change', { target: { value: 'tif' } });
        expect(convertTo.node.value).toBe('tif');

        convertTo.simulate('change', { target: { value: 'PDF' } });
        expect(convertTo.node.value).toBe('PDF');

        convertTo.simulate('change', { target: { value: 'PDF OCR' } });
        expect(convertTo.node.value).toBe('PDF OCR');

        convertTo.simulate('change', { target: { value: 'Other' } });
        expect(convertTo.node.value).toBe('Other');
    })
})



describe('Convert - errors when no file selected', () => {
    const wrapper = mount(<Convert {...props} />);

    it('sets appID value', () => {
        const appID = wrapper.find('select').first();
        appID.simulate('change', { target: { value: 'ERE' } });
        expect(appID.node.value).toBe('ERE');
    })

    it('sets convertTo value', () => {
        const convertTo = wrapper.find('select').last();
        convertTo.simulate('change', { target: { value: 'tif' } });
        expect(convertTo.node.value).toBe('tif');
    })

    it('errors on form submit', () => {
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(props.onSubmit).not.toBeCalled();
    })
})