import { ProfileEditProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./profile.css";

export class ProfileEdit extends Block {
  render() {
    const temp = `   
    <div class="profileData">
    <div class="key">
    <% this.key %>
    </div>
    <input 
        class="profileEditInput text-input" 
        type='<% this.type %>'
        value='<% this.value %>'
        name='<% this.name %>'
    >
</div>
      `;
    return this.compile(temp, this.props);
  }
}
