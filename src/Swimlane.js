import React from "react";
import Card from "./Card";
import "./Swimlane.css";
import Dragula from "dragula";

export default class Swimlane extends React.Component {
    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
              isContainer: function (el) {
                return false; // only elements in drake.containers will be taken into account
              },
              moves: function (el, source, handle, sibling) {
                return true; // elements are always draggable by default
              },
              accepts: function (el, target, source, sibling) {
                return true; // elements can be dropped in any of the `containers` by default
              },
              invalid: function (el, handle) {
                return false; // don't prevent any drags from initiating by default
              },
            }
            Dragula([componentBackingInstance], options);
        }
    };

    render() {
        const cards = this.props.clients.map((client) => {
            return <Card key={client.id} id={client.id} name={client.name} description={client.description} status={client.status} />;
        });
        return (
            <div className="Swimlane-column">
                <div className="Swimlane-title">{this.props.name}</div>
                <div className="Swimlane-dragColumn" ref={this.dragulaDecorator}>
                    {cards}
                </div>
            </div>
        );
    }
}
