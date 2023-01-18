import { ProfileDataProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./profile.css";

export class ProfileData extends Block{
  constructor({
    key,
    value
} : ProfileDataProps) {
    super({ key, value});
}
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
