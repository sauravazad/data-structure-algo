## Graphs
 - ref: https://www.programiz.com/dsa/graph
 - ref: https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/
 - https://leetcode.com/discuss/study-guide/1326900/graph-algorithms-problems-to-practice
### Definition of Graph
- A graph  G consists of a set of  V of vertices (or nodes) and a set E of edges (or arcs) such that each edge
e∈E is associated with a pair of vertices ∈V.
- A graph G with vertices V and edges E is written as
G=(V,E).

## Types of Graph

The following are the most common types of graphs
- Undirected graph
- Directed graph
- Directed acyclic graph

### Graph Terminology

  Graph :
  ```js
  V = {0, 1, 2, 3}
  E = {(0,1), (0,2), (0,3), (1,2)}
  G = {V, E}
  ```
  - **Vertices (V)**:
    vertices are also known as vertex or nodes / points on a graph. eg: 0,1,2,3 are vertices of Graph G
  - **Edges (E)**:
    Edges are drawn or used to connect two nodes of the graph.
    represented as ordered pairs of vertices (u,v) ; u,v ∈ V
  - **Adjacency**:
    A vertex is said to be adjacent to another vertex if there is an edge connecting them.
    Vertices 2 and 3 are not adjacent because there is no edge between them.
  - **Path**:
    A sequence of edges that allows you to go from vertex A to vertex B is called a path.
    eg: 0-1, 1-2 and 0-2 are paths from vertex 0 to vertex 2.
  - **Degree**
    It is the number of vertices adjacent to a vertex V.

## Representation of Graph
  ### Adjacency Matrix
  In this method, the graph is stored in the form of the 2D matrix where rows and columns denote vertices.
  Each entry in the matrix represents the weight of the edge between those vertices.
  ### Adjacency List
  This graph is represented as a collection of linked lists. There is an array of pointer which points to the edges connected to that vertex.
  ### Incidence matrix
