import React from 'react';
import { mount } from 'enzyme';
import Options3d from '../../../src/components/Options3d/Options3d';

describe('<Options3d />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('updates the chart with the passed props', function () {
      mount(<Options3d alpha={10} beta={20} update={this.update} />);
      expect(this.update).to.have.been.calledWith({
        chart: {
          options3d: {
            ...Options3d.defaultProps,
            enabled: true,
            alpha: 10,
            beta: 20
          }
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<Options3d alpha={0} update={this.update} />);
      wrapper.setProps({ alpha: 45 });
      expect(this.update).to.have.been.calledWith({
        chart: {
          options3d: {
            ...Options3d.defaultProps,
            enabled: true,
            alpha: 45
          }
        }
      });
    });
  });
});
