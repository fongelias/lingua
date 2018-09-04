# [lingua](https://github.com/fongelias/lingua#readme)
a natural language processing library


## Design
### Pipeline
#### Receiver
Recieves input to be used in a processor. Always sent with type `string`

#### Processor
Connects to a single Receiver and Sender. Has a pre-processor, strategy, and result, which is piped to an output.

#### Sender
Recieves results to be dispatched.

#### Connector
Inherits from Receiver and Sender, and allows results from one Processor to be used as an input in another.

## Technologies
### Rollup + Babel
Rollup was selected over the traditional webpack for its flatter distributables.

### Typescript
Typescript was selected because of the interfaces feature, to allow more complex configurations of pipelines

### Jest + ts-jest
Jest was selected due to the ease of configuration for testing

### TypeDoc
Used for generating documentation, selected due to ease of use with typescript (over configuring esdocs)

## References
 - [Rollup + Typescript](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)
 - [Rollup + Typescript + Mocha](https://github.com/wadetandy/rollup-typescript-mocha-template)