**Project Proposal : Visualizing Modern History Armed Conflicts**
-----------------------------

**Background and Motivation**
-----------------------------
*Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.*

I work as a defence scientist for the Department of National Defence in Canada, so I am interest in  military topics. I considered many project ideas, but few of them do not require the use of classified or sensitive data.  In the end, I decided to concentrate on the recent history (post-WWII) of armed conflicts in the world, a topic that is fully unclassified and has many interesting spatial and temporal components that can be displayed through an interactive visualization.


**Project Objectives**
---------------------
*Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.*

Hundreds of armed conflicts have occured in the world since World War II (WWII).  This is a lot of data for anybody to grasp.  I want to produce an interactive visualization that will effectively convey information and allow users to answer the following questions:
* Where in the world (countries and/or regions) have conflicts occurred since WWII?
* How many conflicts a particular country or region has been involved in over a given period of time?
* Is there any downward/upward trend in the number of armed conflicts, either  worldwide or in specific countries/regions of interest?
* Do these trends, if any, differ depending on the type and intensity of the conflict?


**Data**
---------
*From where and how are you collecting your data? If appropriate, provide a link to your data sources.*

I intend to use the [Armed Conflict Dataset](http://www.pcr.uu.se/research/ucdp/datasets/ucdp_prio_armed_conflict_dataset/) compiled by the University of Uppsala Conflict Data Program (UCDP) and the International Peace Research Institute, Oslo (PRIO).

**Data Processing**
-------------------
*Do you expect to do substantial data cleanup?*
At first glance, not much cleaning will be required.  Conflict end dates does not appear in all rows, so that will need to be fixed.  I will also have to match country IDs to a lookup table to get countries names.

*What quantities do you plan to derive from your data?*

Duration of conflicts, from start and end dates.

*How will data processing be implemented?*

* I will fill out missing end dates in Excel
* I will then compute conflict durations from start and end dates
* I will convert the CSV to JSON


**Visualization**
------------------
*How will you display your data? Provide some general ideas that you have for the visualization design. Include sketches of your design.*

I want to display simultaneously the temporal and spatial aspects of conflicts.  I foresee a world map at the top of the design, and a plot (or maybe a histogram) of conflicts over time at the bottom.  On the left hand side would be pulldowns to filter the data according to intensity or type of conflict.

*Must-Have Features. These are features without which you would consider your project to be a failure.*
World map and temporal plot.

*Optional Features. Those features which you consider would be nice to have, but not critical.*

Project Schedule. Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members. Write this in terms of weekly deadlines.