# [lingua](https://github.com/fongelias/lingua#readme)
a natural language processing library


## Design
### Pipeline
#### Input
Recieves input to be used in a processor.

#### Processor
Connects to a single Input and Output. Has a pre-processor, strategy, and result, which is piped to an output.

#### Output
Recieves results to be dispatched.

#### Connector
Inherits from Input and Output, and allows results from one Processor to be used as an input in another.

## Technologies
### Rollup + Babel
Rollup was selected over the traditional webpack for its flatter distributables.

### Typescript
Typescript was selected because of the interfaces feature, to allow more configurability.

## References
 - [Rollup + Typescript](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)
 