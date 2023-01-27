import { TProps } from "../../../types/types";
import Block from "./Block"
describe('тест block', () => {
    let isMounted = false;
    let isRendered = false;
    let isRenderAfterUpdate = false;
  
    class TestComponent extends Block<TProps> {
      constructor(props: TProps) {
        super({
          value: props?.value ?? '',
        });
      }
  
      componentDidMount() {
        isMounted = true;
      }
  
      render() {
        isRendered = true;
        if (this.props.value === 'New value') {
          isRenderAfterUpdate = true;
        }
        const temp = `<div>
                              <input type="text" value="<% this.value ? this.value : '' %>">
                        </div>`;
        return this.compile(temp, this.props);
      }
    }
  
    it('mounting', () => {
      expect(isMounted).toEqual(true);
    });
  
    it('render', () => {
      expect(isRendered).toEqual(true);
    });
  
    it('component without props', () => {
      const testComponentWithoutProps = new TestComponent({ value: '' });
      expect(testComponentWithoutProps.props.value).toEqual('');
    });
  
    it('component WITH props', () => {
      const testComponentWithProps = new TestComponent({ value: 'Some value' });
      expect(testComponentWithProps.props.value).toEqual('Some value');
    });
  
    const testComponent = new TestComponent({});
  
    it('set props', () => {
      testComponent.setProps({
        value: 'New value',
      });
      expect(testComponent.props.value).toEqual('New value');
    });
  
    it('final render', () => {
      expect(isRenderAfterUpdate).toEqual(true);
    });
  });