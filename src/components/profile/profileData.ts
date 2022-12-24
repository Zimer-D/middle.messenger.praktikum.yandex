import Block from "../../core/block/Block";
import "./profile.css";

export class ProfileData extends Block {
  render() {
    const temp = `   
     <div class="profileData">
        <div class="key">
            <% this.key %>
        </div>
        <div class="value">
        <% this.value %>
        </div>
    </div>
      `;
    return this.compile(temp, this.props);
  }
}
